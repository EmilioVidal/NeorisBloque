using System;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerMovement : MonoBehaviour
{
    float horizontalInput;
    float moveSpeed = 5f;
    bool isFacingRight = false;
    float jumpPower = 7f;
    bool isGrounded = false;
    public bool hasDoubleJump = false;
    public bool hasGrappler = false;

    public bool canDash = true;
    private bool isDashing;
    private float dashingPower = 24f;
    private float dashingTime = 0.2f;
    private float dashingCooldown = 1f;
    [SerializeField] private TrailRenderer tr;

    public Camera mainCamera;
    public LineRenderer _lineRenderer;
    public DistanceJoint2D _distanceJoint;

    Rigidbody2D rb;
    Animator animator;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();

        // Load the double jump and dash state
        int hasDoubleJumpValue = PlayerPrefs.GetInt("HasDoubleJump", 0);
        if (hasDoubleJumpValue == 1)
        {
            hasDoubleJump = true;
        }

        int hasDashValue = PlayerPrefs.GetInt("HasDash", 0);
        if (hasDashValue == 1)
        {
            canDash = true;
        }

        // Load the grappler state
        int hasGrapplerValue = PlayerPrefs.GetInt("HasGrappler", 0);
        if (hasGrapplerValue == 1)
        {
            hasGrappler = true;
        }

        // Disable grappler initially
        _distanceJoint.enabled = false;
        _lineRenderer.enabled = false;
    }

    void Update()
    {
        horizontalInput = Input.GetAxis("Horizontal");
        FlipSprite();

        if ((Input.GetButtonDown("Jump") && isGrounded) || (hasDoubleJump && Input.GetButtonDown("Jump") && !isGrounded))
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpPower);
            isGrounded = false;
            animator.SetBool("isJumping", !isGrounded);
        }

        if (Input.GetKeyDown(KeyCode.Mouse0) && hasGrappler) // Cambiar a la tecla o botón adecuado para el grappler
        {
            GrapplerShoot();
        }

        if (!isDashing && canDash && Input.GetKeyDown(KeyCode.LeftShift)) // Solo permitir dash si el jugador ya tiene la habilidad
        {
            StartCoroutine(Dash());
        }

        if (!isDashing) // Si no está en dash, permitir el movimiento
        {
            if ((Input.GetButtonDown("Jump") && isGrounded) || (hasDoubleJump && Input.GetButtonDown("Jump") && !isGrounded))
            {
                rb.velocity = new Vector2(rb.velocity.x, jumpPower);
                isGrounded = false;
                animator.SetBool("isJumping", !isGrounded);
            }
            rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);
            animator.SetFloat("xVelocity", Math.Abs(rb.velocity.x));
            animator.SetFloat("yVelocity", rb.velocity.y);
        }

        // Desactivar el grappler cuando se suelta el botón del mouse
        if (Input.GetKeyUp(KeyCode.Mouse0))
        {
            _distanceJoint.enabled = false;
            _lineRenderer.enabled = false;
        }
    }


    void FixedUpdate()
    {
        // Si está en dash, no actualiza el movimiento normal del jugador
        if (isDashing)
        {
            return;
        }

        // Actualiza el movimiento normal del jugador
        rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);
        animator.SetFloat("xVelocity", Math.Abs(rb.velocity.x));
        animator.SetFloat("yVelocity", rb.velocity.y);
    }


    void FlipSprite()
    {
        if (isFacingRight && horizontalInput < 0f || !isFacingRight && horizontalInput > 0f)
        {
            isFacingRight = !isFacingRight;
            Vector3 ls = transform.localScale;
            ls.x *= -1f;
            transform.localScale = ls;
        }
    }

    private IEnumerator Dash()
    {
        canDash = false;
        isDashing = true;
        float originalGravity = rb.gravityScale;
        rb.gravityScale = 0f;

        // Use constant dash direction based on facing
        float dashDirection = isFacingRight ? 1f : -1f;
        rb.velocity = new Vector2(dashDirection * dashingPower, 0f);

        tr.emitting = true;
        yield return new WaitForSeconds(dashingTime);
        tr.emitting = false;
        rb.gravityScale = originalGravity;
        isDashing = false;
        yield return new WaitForSeconds(dashingCooldown);
        canDash = true;
    }

    private void GrapplerShoot()
    {
        Vector2 mousePos = (Vector2)mainCamera.ScreenToWorldPoint(Input.mousePosition);
        _lineRenderer.SetPosition(0, mousePos);
        _lineRenderer.SetPosition(1, transform.position);
        _distanceJoint.connectedAnchor = mousePos;
        _distanceJoint.enabled = true;
        _lineRenderer.enabled = true;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
            animator.SetBool("isJumping", !isGrounded);
        }
        else if (collision.transform.CompareTag("Enemy"))
        {
            PlayerManager.isGameOver = true;
            gameObject.SetActive(false);
        }
        else if (collision.transform.CompareTag("ENDGAME"))
        {
            PlayerManager.isLevelOver = true;
            gameObject.SetActive(false);
        }
    }
}

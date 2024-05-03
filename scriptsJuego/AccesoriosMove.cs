using UnityEngine;

public class AccesoriosMove : MonoBehaviour
{
    float horizontalInput;
    float moveSpeed = 5f;
    bool isFacingRight = false;
    float jumpPower = 5f;
    bool isGrounded = false;

    Animator animator;

    void Start()
    {
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        horizontalInput = Input.GetAxis("Horizontal");
        FlipSprite();

        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            Jump();
        }

        Move(horizontalInput);
    }

    void Move(float horizontalInput)
    {
        Vector3 movement = new Vector3(horizontalInput * moveSpeed * Time.deltaTime, 0f, 0f);
        transform.Translate(movement);
        animator.SetFloat("xVelocity", Mathf.Abs(horizontalInput));
        animator.SetFloat("yVelocity", 0f);
    }

    void Jump()
    {
        isGrounded = false;
        animator.SetBool("isJumping", !isGrounded);
        GetComponent<Rigidbody2D>().velocity = new Vector2(0f, jumpPower);
    }

    void FlipSprite()
    {
        if ((isFacingRight && horizontalInput < 0f) || (!isFacingRight && horizontalInput > 0f))
        {
            isFacingRight = !isFacingRight;
            Vector3 ls = transform.localScale;
            ls.x *= -1f;
            transform.localScale = ls;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
            animator.SetBool("isJumping", !isGrounded);
        }
    }
}

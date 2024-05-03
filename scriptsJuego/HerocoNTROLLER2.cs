using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HerocoNTROLLER2 : MonoBehaviour
{
    [SerializeField]
    private float speed = 10f;
    [SerializeField]
    private float jumpForce = 500f;
    private SpriteRenderer spriteRenderer;
    private bool isGrounded;
    private int jumpCount = 0;
    private int maxJumpCount = 2; // Cambiado a 2 para permitir el doble salto

    private void Awake()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    private void Update()
    {
        // Verificar si el personaje está en el suelo
        isGrounded = Physics2D.Raycast(transform.position, Vector2.down, 0.1f);

        if (Input.GetButtonDown("Jump") && jumpCount < maxJumpCount)
        {
            if (isGrounded || jumpCount == 0) // Permitir el primer salto desde el suelo o el segundo salto en el aire
            {
                Jump();
            }
        }
    }

    private void FixedUpdate()
    {
        float direction = Input.GetAxis("Horizontal");

        if (direction != 0.0f)
        {
            transform.Translate(new Vector3(direction, 0, 0) * speed * Time.deltaTime);

            if (direction < 0)
                spriteRenderer.flipX = true;
            else if (direction > 0)
                spriteRenderer.flipX = false;
        }
    }

    private void Jump()
    {
        // Aplicar una fuerza vertical para simular el salto
        GetComponent<Rigidbody2D>().velocity = new Vector2(GetComponent<Rigidbody2D>().velocity.x, 0); // Reiniciar la velocidad vertical
        GetComponent<Rigidbody2D>().AddForce(Vector2.up * jumpForce);
        jumpCount++;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Restablecer el recuento de saltos cuando toca el suelo
        if (collision.gameObject.CompareTag("Ground"))
        {
            jumpCount = 0;
        }
    }
}

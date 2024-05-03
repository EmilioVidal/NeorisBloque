using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BackgroundParallaxEffect : MonoBehaviour
{
    [SerializeField]
    private GameObject camera;
    [SerializeField]
    private float parallaxEffect;

    private float length, startpos;

    private void Start()
    {
        startpos = transform.position.x;
        length = GetComponent<SpriteRenderer>().bounds.size.x;
    }

    private void FixedUpdate()
    {
        float temp = (camera.transform.position.x * (1 - parallaxEffect));
        float dist = (camera.transform.position.x * parallaxEffect);

        transform.position = new Vector3(startpos + dist, transform.position.y, transform.position.z);

        if (temp > startpos + length)
        {
            startpos += length;
        }
        else if (temp < startpos - length)
        {
            startpos -= length;
        }
    }

}

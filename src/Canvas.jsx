import {useEffect, useRef} from 'react'
import fluid from './simulation/fluid';

const Canvas = () => {
  const canVasRef = useRef(null);

  useEffect(() => {
    const canvas = canVasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // simulation
    function draw() {
      fluid.step();
      ctx.clearRect(0, 0, width, height);
      fluid.renderToCanvas(ctx, width, height);

      requestAnimationFrame(draw);
    } // end draw
    
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / width) * fluid.N)
      const y = Math.floor(((e.clientY - rect.top) / height) * fluid.N)

      fluid.addSource(x, y, 10)
      fluid.addVelocity(x, y, 1, 1)
    });

    draw();
  }, []);

  return (
    <canvas
      ref={canVasRef}
      width={400}
      height={400}
      style={{ border: '1px solid white', backgroundColor: 'black' }}
    />
  )
}

export default Canvas
import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

const ChatKeyboard = () => {
  return (
    <div className="chat-keyboard-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/qruon7OP3X-HOCpj/scene.splinecode"
          onLoad={(splineApp) => {
            // Remove Spline watermark
            const watermark = document.querySelector('[data-spline-watermark]');
            if (watermark) {
              watermark.style.display = 'none';
            }
            
            // Also try alternative selectors
            const splineWatermarks = document.querySelectorAll('a[href*="spline.design"]');
            splineWatermarks.forEach(el => el.style.display = 'none');
          }}
          style={{
            width: '100%',
            height: '100vh',
            minHeight: '100vh',
          }}
        />
      </Suspense>
    </div>
  );
};

export default ChatKeyboard;

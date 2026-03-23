import { useEffect, useRef, useState } from 'react';

/**
 * Higher-Order Component that adds scroll-triggered fade-up animation
 * to any wrapped component.
 */
const withAnimation = (WrappedComponent, options = {}) => {
  const { delay = 0, threshold = 0.1 } = options;

  const AnimatedComponent = (props) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

  AnimatedComponent.displayName = `withAnimation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AnimatedComponent;
};

export default withAnimation;

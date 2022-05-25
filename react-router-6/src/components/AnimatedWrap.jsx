import { motion } from 'framer-motion';

const AnimatedWrap = ({ children }) => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            style={{ height: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedWrap;

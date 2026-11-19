"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

let hasHydratedApp = false;

export default function Template({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();
    const [shouldAnimate] = useState(() => hasHydratedApp);

    useEffect(() => {
        hasHydratedApp = true;
    }, []);

    const initial =
        shouldAnimate && !prefersReducedMotion ? { opacity: 0, y: 10 } : false;

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

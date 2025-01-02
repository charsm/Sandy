import { motion } from "framer-motion";

/**
 * ShowProvider component
 * 解决加载时的闪烁问题
 * @param param0
 * @returns
 */
export default function ShowProvider({
  children,
  isClient,
}: {
  children: React.ReactNode;
  isClient?: boolean;
}) {
  return isClient ? (
    <motion.div
      className="w-full flex"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  ) : null;
}

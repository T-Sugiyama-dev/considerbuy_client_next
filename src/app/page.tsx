"use client"

import top from "./top.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { topDelay, topProps } from "@/lib";

export default function Top() {
  return (
    <div className={top.container}>
      <div className={top.wrapper}>
        <motion.div {...topProps}>
          <h1 className={top.title}>Consider Buy</h1>
        </motion.div>

        <motion.div {...topProps} animate={{ ...topProps.animate, transition: { delay: topDelay, ease: "easeInOut", duration: 1, } }}>
          <p className={top.text}>
            一般的に、企業などが新たなツールを導入する際には、費用対効果を検討しますが、個人においても同様のアプローチが役立つことが多いです。
          </p>
        </motion.div>

        <br />
        <br />

        <motion.div {...topProps} animate={{ ...topProps.animate, transition: { delay: topDelay * 2, ease: "easeInOut", duration: 1, } }}>
          <p className={top.text}>
            <b>「自身の仕事に特定のツールがどれほどの生産性向上をもたらすかを計算したことはありますか？」</b>
          </p>
        </motion.div>
          
        <br />
        <br />

        <motion.div {...topProps} animate={{ ...topProps.animate, transition: { delay: topDelay * 3, ease: "easeInOut", duration: 1, } }}>
          <p className={top.text}>
            このアプリは、そのような計算を手助けするために開発されました。
          </p>

          <p className={top.attention}>
            ※このアプリが提供する情報は、独自のロジックに基づいて計算されていますので、ご自身の判断で参考にしてください。
          </p>
        </motion.div>

        <motion.div {...topProps} animate={{ ...topProps.animate, transition: { delay: topDelay * 4, ease: "easeInOut", duration: 1, } }}>
          <div className={top.btn_wrapper}>
            <Link href="/calculator">
              <div className={top.btn_start}>
                Let&apos;s get started!
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
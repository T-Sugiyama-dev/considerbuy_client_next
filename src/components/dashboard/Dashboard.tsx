"use client";
import { useState, useEffect } from "react";
import { ResultData } from "@/types";
import { convertHours, checkPayback, convertDays } from "../../lib/dashboard";
import { dashboardDelay, dashboardProps } from "../../lib/animation";
import { motion } from "framer-motion";
import dashboard from './dashboard.module.css';

interface DashboardProps {
  result?: ResultData;
  switchToForm: () => void;
}

export const Dashboard = ({ result, switchToForm }: DashboardProps) => {
  const [className, setClassName]       = useState<string>("");
  const [ymdPayback, setYmdPayback]     = useState<string>("");
  const [ymdSavedTime, setYmdSavedTime] = useState<string>("");

  useEffect(() => {
    setYmdSavedTime(convertHours(
      result?.savedTime       as number,
      result?.workHours       as number,
      result?.monthlyWorkDays as number,
      result?.annualWorkDays  as number
    ));

    if(checkPayback(result?.paybackDays as number, result?.toolTerm as number)) {
      setYmdPayback(convertDays(
        result?.paybackDays     as number,
        result?.monthlyWorkDays as number,
        result?.annualWorkDays  as number
      ));
    }else{
      setYmdPayback("使用期間内の回収不可");
      setClassName("close");
    }
  }, []);

  return (
    <div className={dashboard.container}>
      <div className={dashboard.wrapper}>
        <h1 className={dashboard.title}>Analytics</h1>

        <div className={dashboard.content_container}>
          <motion.div
            {...dashboardProps}
            className={dashboard.hourlyWage_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>時給</p>
              <p className={dashboard.text}><b>{result?.hourlyWage.toLocaleString()}</b>円</p>
            </div>
          </motion.div>

          <motion.div
            {...dashboardProps}
            animate={{ ...dashboardProps.animate, transition: { delay: dashboardDelay, ease: "easeInOut", duration: 1, } }}
            className={dashboard.totalCost_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>総費用</p>
              <p className={dashboard.text}><b>{result?.totalCost.toLocaleString()}</b>円</p>
            </div>
          </motion.div>
        </div>

        <div className={dashboard.content_container}>
          <motion.div
            {...dashboardProps}
            animate={{ ...dashboardProps.animate, transition: { delay: dashboardDelay * 2, ease: "easeInOut", duration: 1, } }}
            className={dashboard.dailyProductivity_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>生産性 / 日</p>
              <p className={dashboard.text}><b>{result?.dailySavedMinutes.toLocaleString()}</b>分</p>
              <p className={dashboard.text}>
                &#8594; &#10005; 時給 =
                <br />
                <b>{result?.dailyProfit.toLocaleString()}</b>
                円
              </p>
            </div>
          </motion.div>

          <motion.div
            {...dashboardProps}
            animate={{ ...dashboardProps.animate, transition: { delay: dashboardDelay * 3, ease: "easeInOut", duration: 1, } }}
            className={dashboard.totalProductivity_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>生産性 / 使用期間</p>
              <p className={dashboard.text}><b>{result?.savedTime.toLocaleString()}</b>時間</p>
              <p className={dashboard.text}>{ymdSavedTime}</p>
              <p className={dashboard.text}>
                &#8594; &#10005; 時給 =
                <br />
                <b>{result?.profit.toLocaleString()}</b>
                円
              </p>
            </div>
          </motion.div>
        </div>

        <div className={dashboard.content_container}>
          <motion.div
            {...dashboardProps}
            animate={{ ...dashboardProps.animate, transition: { delay: dashboardDelay * 4, ease: "easeInOut", duration: 1, } }}
            className={dashboard.roi_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>ROI</p>
              <p className={dashboard.text}><b>{result?.roi.toLocaleString()}</b>%</p>
              <p className={dashboard.desc}>※ROIが高いかどうかは、業界や具体的なビジネスプランに依存します。ツールの導入などにおけるROIは、200％や300％という数値になることもあります。</p>
            </div>
          </motion.div>

          <motion.div
            {...dashboardProps} 
            animate={{ ...dashboardProps.animate, transition: { delay: dashboardDelay * 5, ease: "easeInOut", duration: 1, } }}
            className={dashboard.payback_wrapper}
          >
            <div className={dashboard.content_wrapper}>
              <p className={dashboard.category}>回収期間</p>
              <div className={className}>
                <p className={dashboard.text}><b>{result?.paybackDays.toLocaleString()}</b>日</p>
              </div>
              <p className={dashboard.text}>{ymdPayback}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={dashboard.btn} onClick={switchToForm}>
        <p>Get back</p>
      </div>
    </div>
  );
}

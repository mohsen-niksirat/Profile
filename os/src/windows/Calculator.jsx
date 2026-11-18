import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { Delete, Divide, Equal, Minus, Percent, Plus, X } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { localizeDigits, useLocale, useT } from "../i18n";

const OPS = {
  "/": (a, b) => (b === 0 ? "Error" : a / b),
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "+": (a, b) => a + b,
};

const formatResult = (val) => {
  if (val === "Error" || Number.isNaN(val) || !Number.isFinite(val)) return "Error";
  const rounded = Math.round(val * 1e10) / 1e10;
  const str = String(rounded);
  return str.length > 11 ? Number(rounded).toExponential(5) : str;
};

const Calculator = () => {
  const t = useT();
  const locale = useLocale();
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false);

  const inputDigit = useCallback((d) => {
    setDisplay((cur) => {
      if (fresh || cur === "0" || cur === "Error") {
        setFresh(false);
        return d;
      }
      return cur.length >= 11 ? cur : `${cur}${d}`;
    });
  }, [fresh]);

  const inputDot = useCallback(() => {
    setDisplay((cur) => {
      if (fresh || cur === "Error") {
        setFresh(false);
        return "0.";
      }
      return cur.includes(".") ? cur : `${cur}.`;
    });
  }, [fresh]);

  const clearAll = useCallback(() => {
    if (display !== "0" && !fresh) {
      setDisplay("0");
    } else {
      setDisplay("0");
      setAcc(null);
      setOp(null);
      setFresh(false);
    }
  }, [display, fresh]);

  const toggleSign = useCallback(() => {
    setDisplay((cur) => {
      if (cur === "0" || cur === "Error") return cur;
      return cur.startsWith("-") ? cur.slice(1) : `-${cur}`;
    });
  }, []);

  const percent = useCallback(() => {
    setDisplay((cur) => {
      if (cur === "Error") return "Error";
      return formatResult(parseFloat(cur) / 100);
    });
  }, []);

  const chooseOp = useCallback((nextOp) => {
    if (display === "Error") return;
    const current = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const res = OPS[op](acc, current);
      const formatted = formatResult(res);
      setDisplay(formatted);
      setAcc(formatted === "Error" ? null : parseFloat(formatted));
    } else {
      setAcc(current);
    }
    setOp(nextOp);
    setFresh(true);
  }, [acc, display, fresh, op]);

  const evaluate = useCallback(() => {
    if (acc === null || !op || display === "Error") return;
    const current = parseFloat(display);
    const formatted = formatResult(OPS[op](acc, current));
    setDisplay(formatted);
    setAcc(null);
    setOp(null);
    setFresh(true);
  }, [acc, display, op]);

  const backspace = useCallback(() => {
    setDisplay((cur) => {
      if (fresh || cur === "Error" || cur.length <= 1 || (cur.length === 2 && cur.startsWith("-"))) {
        setFresh(false);
        return "0";
      }
      return cur.slice(0, -1);
    });
  }, [fresh]);

  useEffect(() => {
    const onKey = (e) => {
      const winEl = document.querySelector(".window-calculator");
      if (!winEl || winEl.style.display === "none") return;
      if (document.activeElement && !winEl.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === ".") {
        e.preventDefault();
        inputDot();
      } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault();
        chooseOp(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        evaluate();
      } else if (e.key === "%") {
        e.preventDefault();
        percent();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
        clearAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [backspace, chooseOp, clearAll, evaluate, inputDigit, inputDot, percent]);

  const clearLabel = display !== "0" && !fresh ? "C" : "AC";
  const shown = display === "Error" ? t("calc.error") : localizeDigits(display, locale);

  return (
    <>
      <WindowHeader title={t("window.calculator")} className="calc-header">
        <button
          type="button"
          className="calc-back-btn"
          onClick={backspace}
          aria-label={t("calc.backspace")}
        >
          <Delete className="size-3.5" aria-hidden="true" />
        </button>
      </WindowHeader>

      <div className="window-body calc-body" dir="ltr" tabIndex={-1}>
        <div className="calc-display" role="status" aria-live="polite">
          {op && (
            <span className="calc-op-badge" aria-hidden="true">
              {acc !== null ? localizeDigits(String(acc), locale) : ""}{" "}
              {op === "*" ? "×" : op === "/" ? "÷" : op === "-" ? "−" : "+"}
            </span>
          )}
          <span className={clsx("calc-readout tabular-nums", display.length > 8 && "is-compact")}>
            {shown}
          </span>
        </div>

        <div className="calc-grid">
          <button type="button" className="calc-btn is-fn" onClick={clearAll}>
            {clearLabel}
          </button>
          <button type="button" className="calc-btn is-fn" onClick={toggleSign} aria-label={t("calc.sign")}>
            ±
          </button>
          <button type="button" className="calc-btn is-fn" onClick={percent} aria-label={t("calc.percent")}>
            <Percent className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={clsx("calc-btn is-op", op === "/" && fresh && "is-active")}
            onClick={() => chooseOp("/")}
            aria-label={t("calc.divide")}
          >
            <Divide className="size-4" aria-hidden="true" />
          </button>

          {["7", "8", "9"].map((d) => (
            <button key={d} type="button" className="calc-btn" onClick={() => inputDigit(d)}>
              {localizeDigits(d, locale)}
            </button>
          ))}
          <button
            type="button"
            className={clsx("calc-btn is-op", op === "*" && fresh && "is-active")}
            onClick={() => chooseOp("*")}
            aria-label={t("calc.multiply")}
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          {["4", "5", "6"].map((d) => (
            <button key={d} type="button" className="calc-btn" onClick={() => inputDigit(d)}>
              {localizeDigits(d, locale)}
            </button>
          ))}
          <button
            type="button"
            className={clsx("calc-btn is-op", op === "-" && fresh && "is-active")}
            onClick={() => chooseOp("-")}
            aria-label={t("calc.subtract")}
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>

          {["1", "2", "3"].map((d) => (
            <button key={d} type="button" className="calc-btn" onClick={() => inputDigit(d)}>
              {localizeDigits(d, locale)}
            </button>
          ))}
          <button
            type="button"
            className={clsx("calc-btn is-op", op === "+" && fresh && "is-active")}
            onClick={() => chooseOp("+")}
            aria-label={t("calc.add")}
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>

          <button type="button" className="calc-btn is-zero" onClick={() => inputDigit("0")}>
            {localizeDigits("0", locale)}
          </button>
          <button type="button" className="calc-btn" onClick={inputDot}>
            .
          </button>
          <button type="button" className="calc-btn is-op" onClick={evaluate} aria-label={t("calc.equals")}>
            <Equal className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Calculator;

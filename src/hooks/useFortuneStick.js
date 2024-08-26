import { useState, useCallback } from 'react';

export default function useFortuneStick() {
  const [isShaking, setIsShaking] = useState(false);
  const [showStick, setShowStick] = useState(false);
  const [error, setError] = useState(null);
  const [fortune, setFortune] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const shakeFortune = useCallback(async () => {
    if (isShaking) {
      setError('请等待当前摇签结束');
      return;
    }

    setIsShaking(true);
    setShowStick(false);
    setError(null);

    try {
      // 模拟摇签过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('http://localhost:8000/api/fortune');
      if (!response.ok) {
        throw new Error('获取运势失败');
      }
      const data = await response.json();
      console.log("API 返回数据:", data);  // 添加这行
      setFortune(data.fortune);
      setInterpretation(data.interpretation);
      setShowStick(true);
    } catch (err) {
      console.error("获取运势时出错:", err);  // 添加这行
      setError(err.message);
    } finally {
      setIsShaking(false);
    }
  }, [isShaking]);

  return { isShaking, showStick, shakeFortune, error, fortune, interpretation };
}
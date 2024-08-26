"use client";
import React from 'react';
import { motion } from 'framer-motion';
import useFortuneStick from '../hooks/useFortuneStick';
import Image from 'next/image';

export default function Home() {
  const { isShaking, showStick, shakeFortune, error, fortune, interpretation } = useFortuneStick();

  console.log('Home 组件渲染:', { showStick, fortune, interpretation });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <main className="text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-10 text-red-800 tracking-wide">每日运势</h1>
        
        {!showStick && (
          <motion.div
            className="w-48 h-72 relative rounded-2xl shadow-lg overflow-hidden mx-auto mb-10"
            animate={{ rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isShaking ? Infinity : 0 }}
          >
            <Image
              src="/images/bucket.png"
              alt="摇签桶"
              fill
              sizes="100%"
              style={{ objectFit: 'contain' }}
              priority
            />
          </motion.div>
        )}

        {showStick && (
          <div className="mb-10">
            <motion.div
              className="w-10 h-72 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-lg shadow-md mx-auto mb-4 flex items-center justify-center relative overflow-hidden"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-800 rounded-t-lg"></div>
              <span className="writing-vertical text-2xl font-bold text-white px-2">{fortune}</span>
            </motion.div>
            {interpretation && (
              <motion.p
                className="text-lg text-gray-800 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                解析：{interpretation}
              </motion.p>
            )}
          </div>
        )}

        <button
          onClick={shakeFortune}
          disabled={isShaking}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isShaking ? '摇签中...' : '摇签'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}
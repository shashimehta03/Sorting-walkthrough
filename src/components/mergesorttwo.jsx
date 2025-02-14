import React, { useState, useEffect } from 'react';

const MergeSortVisualizer = () => {
  const [leftArray, setLeftArray] = useState([]);
  const [rightArray, setRightArray] = useState([]);
  const [mergedArray, setMergedArray] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [arraySize, setArraySize] = useState(8);
  const [speed, setSpeed] = useState(1000);
  const [currentIndices, setCurrentIndices] = useState({ left: -1, right: -1 });

  const generateArrays = () => {
    const left = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 200) + 20
    ).sort((a, b) => a - b);

    const right = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 200) + 20
    ).sort((a, b) => a - b);

    setLeftArray(left);
    setRightArray(right);
    setMergedArray([]);
    setCurrentIndices({ left: -1, right: -1 });
  };

  useEffect(() => {
    generateArrays();
  }, [arraySize]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const merge = async () => {
    if (isMerging) return;
    setIsMerging(true);

    const leftCopy = [...leftArray];
    const rightCopy = [...rightArray];
    const merged = [];
    let i = 0, j = 0;

    while (i < leftCopy.length && j < rightCopy.length) {
      setCurrentIndices({ left: i, right: j });
      await sleep(2000 - speed);

      if (leftCopy[i] <= rightCopy[j]) {
        merged.push({ value: leftCopy[i], source: 'left' });
        i++;
      } else {
        merged.push({ value: rightCopy[j], source: 'right' });
        j++;
      }
      setMergedArray([...merged]);
      await sleep(2000 - speed);
    }

    while (i < leftCopy.length) {
      setCurrentIndices({ left: i, right: -1 });
      await sleep(2000 - speed);
      merged.push({ value: leftCopy[i], source: 'left' });
      setMergedArray([...merged]);
      i++;
    }

    while (j < rightCopy.length) {
      setCurrentIndices({ left: -1, right: j });
      await sleep(2000 - speed);
      merged.push({ value: rightCopy[j], source: 'right' });
      setMergedArray([...merged]);
      j++;
    }

    setCurrentIndices({ left: -1, right: -1 });
    setIsMerging(false);
  };

  const Bar = ({ value, isActive, source }) => {
    let backgroundColor = '#6366f1';
    if (isActive) {
      backgroundColor = '#ef4444';
    } else if (source === 'left') {
      backgroundColor = '#f97316';
    } else if (source === 'right') {
      backgroundColor = '#8b5cf6';
    } else if (source === 'merged') {
      backgroundColor = '#22c55e';
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <div
          style={{
            width: '32px',
            height: `${value}px`,
            backgroundColor,
            borderRadius: '5px',
            transition: 'all 0.2s ease-in-out'
          }}
        />
        <span style={{ fontSize: '12px' }}>{value}</span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '24px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>Array Size: {arraySize}</label>
          <input
            type="range"
            min="4"
            max="12"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isMerging}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </div>
        <div>
          <label>Speed: {speed}ms</label>
          <input
            type="range"
            min="0"
            max="1900"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={isMerging}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>Left Array</h3>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'flex-end', height: '200px', background: '#f9fafb', padding: '10px', borderRadius: '10px' }}>
            {leftArray.map((value, idx) => (
              <Bar key={idx} value={value} isActive={idx === currentIndices.left} />
            ))}
          </div>
        </div>
        <div>
          <h3>Right Array</h3>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'flex-end', height: '200px', background: '#f9fafb', padding: '10px', borderRadius: '10px' }}>
            {rightArray.map((value, idx) => (
              <Bar key={idx} value={value} isActive={idx === currentIndices.right} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Merged Array</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'flex-end', height: '200px', background: '#f9fafb', padding: '10px', borderRadius: '10px' }}>
          {mergedArray.map((item, idx) => (
            <Bar key={idx} value={item.value} source={item.source} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={generateArrays}
          disabled={isMerging}
          style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', borderRadius: '5px', cursor: 'pointer', opacity: isMerging ? 0.5 : 1 }}
        >
          Generate New Arrays
        </button>
        <button
          onClick={merge}
          disabled={isMerging}
          style={{ padding: '10px 20px', backgroundColor: '#16a34a', color: 'white', borderRadius: '5px', cursor: 'pointer', opacity: isMerging ? 0.5 : 1 }}
        >
          Start Merging
        </button>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;

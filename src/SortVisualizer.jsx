import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

function SortVisualizer() {
  const [arr, setArr] = useState([]);
  const [val, setVal] = useState(20);
  const [delay, setDelay] = useState(5);
  const [index, setIndex] = useState([]);
  const [notRunning, setNotRunning] = useState(true);
  const [winSize, setSize] = useState({
    winWidth: window.innerWidth,
    calcSize: Math.floor(window.innerWidth / 7.5 - 4),
  });

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
      const newCalcSize = Math.floor(newWidth / 7.5 - 4);

      const newObj = {
        winWidth: window.innerWidth,
        calcSize: newCalcSize,
      };

      setSize((prev) => newObj);
    }
    window.addEventListener("resize", handleResize);
    if (val > winSize.calcSize) {
      createNewArray(val);
      setVal((prev) => winSize.calcSize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [winSize]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function createNewArray(n) {
    let newArr = [];
    for (let i = 0; i < n; i++) {
      newArr.push(randomInt(10, 500));
    }
    setArr(newArr);
  }

  useEffect(() => {
    createNewArray(val);
  }, []);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //
  //Bubble Sort
  //
  const bubbleSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        setIndex([j, j + 1]);
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          setArr([...arrayCopy]);
          await sleep(delay);
        }
        setIndex([]);
      }
    }
    setNotRunning((prev) => true);
  };

  //
  //Insertion Sort
  //
  const insertionSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    for (let i = 1; i < arrayCopy.length; i++) {
      let key = arrayCopy[i];
      let j = i - 1;
      setIndex([i]);
      while (j >= 0 && arrayCopy[j] > key) {
        setIndex([j, j + 1]);
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
        setArr([...arrayCopy]);
        await sleep(delay);
      }
      arrayCopy[j + 1] = key;
      setArr([...arrayCopy]);
      setIndex([]);
    }
    setNotRunning((prev) => true);
  };

  //
  //Quick Sort
  //
  const quickSort = async (array, low, high) => {
    setNotRunning((prev) => false);
    if (low < high) {
      const pi = await partition(array, low, high);
      await quickSort(array, low, pi - 1);
      await quickSort(array, pi + 1, high);
    }
    setNotRunning((prev) => true);
  };

  const partition = async (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setIndex([j, high]);
      await sleep(delay);
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setArr([...array]);
        await sleep(delay);
      }
      setIndex([]);
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArr([...array]);
    return i + 1;
  };

  //
  //Merge Sort
  //

  const mergeSort = async (array, left, right) => {
    setNotRunning((prev) => false);
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(array, left, mid);
      await mergeSort(array, mid + 1, right);
      await merge(array, left, mid, right);
    }

    if (left === 0 && right === array.length - 1) {
      setNotRunning((prev) => true);
    }
  };

  const merge = async (array, left, mid, right) => {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArray.length && j < rightArray.length) {
      setIndex([k]);
      await sleep(delay);
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }
      setArr([...array]);
      k++;
    }

    while (i < leftArray.length) {
      setIndex([k]);
      await sleep(delay);
      array[k] = leftArray[i];
      setArr([...array]);
      i++;
      k++;
    }

    while (j < rightArray.length) {
      setIndex([k]);
      await sleep(delay);
      array[k] = rightArray[j];
      setArr([...array]);
      j++;
      k++;
    }
  };

  //
  //Selection Sort
  //
  const selectionSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      let minIndex = i;
      setIndex([minIndex]);
      for (let j = i + 1; j < arrayCopy.length; j++) {
        setIndex([minIndex, j]);
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }
        await sleep(delay);
      }

      if (minIndex !== i) {
        [arrayCopy[i], arrayCopy[minIndex]] = [
          arrayCopy[minIndex],
          arrayCopy[i],
        ];
        setArr([...arrayCopy]);
        await sleep(delay);
      }
      setIndex([]);
    }
    setNotRunning((prev) => true);
  };

  //
  //Random Sort
  //
  const randomizedBubbleSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    const n = arrayCopy.length;

    for (let i = 0; i < n * n; i++) {
      const j = randomInt(0, n);
      const k = randomInt(0, n);

      setIndex([j, k]);

      await sleep(delay);

      if (arrayCopy[j] > arrayCopy[k]) {
        [arrayCopy[j], arrayCopy[k]] = [arrayCopy[k], arrayCopy[j]];
        setArr([...arrayCopy]);
      }
      setIndex([]);
    }

    setNotRunning((prev) => true);
  };

  //
  //Radix Sort
  //

  const radixSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    const max = getMax(arrayCopy);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSortForRadix(arrayCopy, exp);
    }

    setNotRunning((prev) => true);
  };

  const getMax = (array) => {
    return Math.max(...array);
  };

  const countingSortForRadix = async (array, exp) => {
    const n = array.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      const index = Math.floor(array[i] / exp) % 10;
      count[index]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(array[i] / exp) % 10;
      output[count[index] - 1] = array[i];
      count[index]--;
      setArr([...output]);
      await sleep(delay);
    }

    for (let i = 0; i < n; i++) {
      array[i] = output[i];
    }
  };

  //
  //Heap Sort
  //

  const heapSort = async () => {
    setNotRunning((prev) => false);
    const arrayCopy = [...arr];
    const n = arrayCopy.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arrayCopy, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
      setArr([...arrayCopy]);
      await sleep(delay);

      await heapify(arrayCopy, i, 0);
    }

    setNotRunning((prev) => true);
  };

  const heapify = async (array, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      setArr([...array]);
      setIndex([i, largest]);
      await sleep(delay);
      setIndex([]);

      await heapify(array, n, largest);
    }
  };

  ////////////////
  //  Algorithms end
  ////////////////

  return (
    <>
      <div className=" m-2 ps-2 pe-2 h-[550px] bg-indigo-100 flex items-end rounded-md ">
        {arr.map((num, idx) => (
          <div
            key={idx}
            className={`mx-[2px] ${
              index.includes(idx) ? "bg-red-400" : "bg-indigo-400"
            }`}
            style={{ height: `${num}px`, minWidth: "3.5px", maxWidth: "3.5px" }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between px-4 flex-wrap">
        <div>
          <p className="font-semibold mx-2 mb-2 text-gray-800">
            [Min size: 20, Max Size: {winSize.calcSize}]
          </p>
          <div className="flex flex-wrap">
            <CustomButton
              text={"Create Array"}
              disabled={!notRunning}
              handleClick={() => {
                val >= 20 && val <= winSize.calcSize
                  ? createNewArray(val)
                  : alert("Limit Under or exceeded");
              }}
            />
            <CustomInput
              handleChange={(e) => {
                setVal(e.target.value);
              }}
              placeholder={"Size"}
              min={20}
              max={val}
              value={val}
            />
            <CustomInput
              handleChange={(e) => {
                setDelay(e.target.value);
              }}
              placeholder={"Delay"}
              min={5}
              max={500}
            />
          </div>
        </div>

        <div className="text-center ">
          <p className="font-semibold text-gray-600 text-2xl ">
            {"<--- Sorting Methods --->"}
          </p>
          <CustomButton
            disabled={!notRunning}
            text={"Bubble Sort"}
            handleClick={() =>
              notRunning ? bubbleSort() : alert("Sort in progress")
            }
          />
          <CustomButton
            disabled={!notRunning}
            text={"Insertion Sort"}
            handleClick={() =>
              notRunning ? insertionSort() : alert("Sort in progress")
            }
          />
          <CustomButton
            disabled={!notRunning}
            text={"Selection Sort"}
            handleClick={() =>
              notRunning ? selectionSort() : alert("Sort in progress")
            }
          />

          <CustomButton
            disabled={!notRunning}
            text={"Quick Sort"}
            handleClick={() =>
              notRunning
                ? quickSort([...arr], 0, arr.length - 1)
                : alert("Sort in progress")
            }
          />
          <CustomButton
            disabled={!notRunning}
            text={"Merge Sort"}
            handleClick={() =>
              notRunning
                ? mergeSort([...arr], 0, arr.length - 1)
                : alert("Sort in progress")
            }
          />

          <CustomButton
            disabled={!notRunning}
            text={"Heap Sort"}
            handleClick={() =>
              notRunning ? heapSort() : alert("Sort in progress")
            }
          />
          <CustomButton
            disabled={!notRunning}
            text={"Radix Sort"}
            handleClick={() =>
              notRunning ? radixSort() : alert("Sort in progress")
            }
          />
        </div>
      </div>
    </>
  );
}

export default SortVisualizer;

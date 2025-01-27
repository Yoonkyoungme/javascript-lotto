import Console from './Console.js';

async function executeWithRetry(asyncFunc) {
  try {
    return await asyncFunc();
  } catch (error) {
    Console.print(error.message);
    return executeWithRetry(asyncFunc);
  }
}

export default executeWithRetry;

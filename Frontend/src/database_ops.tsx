// Create a function to open the IndexedDB database
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("CalculatorDB", 1);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore("calculations", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("timestamp", "timestamp", { unique: false });
    };
  });
}

// Function to add a calculation to the IndexedDB
async function addCalculation(calculation: string): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("calculations", "readwrite");
    const store = transaction.objectStore("calculations");

    const timestamp = new Date().getTime();

    const request = store.add({ calculation, timestamp });

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve();
    };
  });
}

// Function to retrieve all calculations from IndexedDB
async function getAllCalculations(): Promise<string[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("calculations", "readonly");
    const store = transaction.objectStore("calculations");
    const calculations: string[] = [];

    const request = store.openCursor();

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        calculations.push(cursor.value.calculation);
        cursor.continue();
      } else {
        resolve(calculations);
      }
    };
  });
}

function deleteAllFromIndexedDB(
  databaseName: string,
  objectStoreName: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = window.indexedDB.open(databaseName);

    request.onsuccess = () => {
      const db = request.result;

      const transaction = db.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);

      const deleteRequest = objectStore.clear();

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(deleteRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export const openDB = openDatabase;
export const addToDB = addCalculation;
export const retriveDB = getAllCalculations;
export const deleteAllDB = deleteAllFromIndexedDB;

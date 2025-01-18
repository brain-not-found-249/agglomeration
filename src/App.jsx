import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

const CryptoComponent = () => {
  const [algorithm, setAlgorithm] = useState('rsa'); // Select the algorithm (RSA, AES, or SHA-256)
  const [action, setAction] = useState('encrypt'); // Action (encrypt or decrypt)
  
  // AES specific
  const [aesKey, setAesKey] = useState('');
  const [aesIv, setAesIv] = useState('');
  const [aesMode, setAesMode] = useState('ECB');
  
  // RSA specific
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [e, setE] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  
  const [plaintext, setPlaintext] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [hashedText, setHashedText] = useState('');

  const handleAESEncryption = async () => {
    try {
      const response = await axios.post('/api/aes_encrypt', {
        aesKey, aesIv, aesMode, plaintext
      });
      setEncryptedText(response.data.encryptedText);
    } catch (err) {
      toast.error('Error encrypting the data');
    }
  };

  const handleAESDecryption = async () => {
    try {
      const response = await axios.post('/api/aes_decrypt', {
        aesKey, aesIv, aesMode, ciphertext: encryptedText
      });
      setDecryptedText(response.data.decryptedText);
    } catch (err) {
      toast.error('Error decrypting the data');
    }
  };

  const handleRSAEncryption = async () => {
    try {
      const response = await axios.post('/api/rsa_encrypt', {
        p, q, e, plaintext
      });
      setEncryptedText(response.data.encryptedText);
    } catch (err) {
      toast.error('Error encrypting the data');
    }
  };

  const handleRSADecryption = async () => {
    try {
      const response = await axios.post('/api/rsa_decrypt', {
        p, q, d, n, ciphertext: encryptedText
      });
      setDecryptedText(response.data.decryptedText);
    } catch (err) {
      toast.error('Error decrypting the data');
    }
  };

  const handleSHA256Hash = async () => {
    try {
      const response = await axios.post('/api/sha256', { plaintext });
      setHashedText(response.data.hashedText);
    } catch (err) {
      toast.error('Error hashing the data');
    }
  };

  const handleAction = () => {
    if (algorithm === 'aes') {
      if (action === 'encrypt') {
        handleAESEncryption();
      } else if (action === 'decrypt') {
        handleAESDecryption();
      }
    } else if (algorithm === 'rsa') {
      if (action === 'encrypt') {
        handleRSAEncryption();
      } else if (action === 'decrypt') {
        handleRSADecryption();
      }
    } else if (algorithm === 'sha') {
      if (action === 'encrypt') {
        handleSHA256Hash();
      }
    }
  };

  return (
    <div>
      <nav className="flex text-white gap-8 h-16 text-center items-center justify-between mr-12 font-semibold text-2xl">
        <div></div>
        <div>
          <a href="#"> Lab </a>
          <a href="#"> Implementation</a>
          <a href="#"> Scanner </a>
          <a href="#"> Check! </a>
        </div>
      </nav>
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white ml-12">Cryptographic Algorithm</h2>
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md ml-10 mr-10">

      <div className="mb-4">
        <label className="block font-medium text-gray-900 dark:text-white">Select Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
        >
          <option value="rsa">RSA</option>
          <option value="aes">AES</option>
          <option value="sha">SHA-256</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-900 dark:text-white">Action:</label>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
          disabled={algorithm === 'sha'}
        >
          <option value="encrypt">Encrypt</option>
          {algorithm !== 'sha' && <option value="decrypt">Decrypt</option>}
        </select>
      </div>

      {/* AES Section */}
      {algorithm === 'aes' && (
        <div>
          {action === 'encrypt' && (
            <>
              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES Key:</label>
                <input
                  type="text"
                  value={aesKey}
                  onChange={(e) => setAesKey(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES IV (Initialization Vector):</label>
                <input
                  type="text"
                  value={aesIv}
                  onChange={(e) => setAesIv(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES Mode:</label>
                <select
                  value={aesMode}
                  onChange={(e) => setAesMode(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                >
                  <option value="ECB">ECB</option>
                  <option value="CBC">CBC</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">Message (Plaintext):</label>
                <textarea
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleAction}
                className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 dark:hover:bg-blue-400"
              >
                Encrypt
              </button>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Encrypted Text (Hex):</h3>
                <textarea
                  value={encryptedText}
                  readOnly
                  className="w-full h-24 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}

          {action === 'decrypt' && (
            <>
              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES Key:</label>
                <input
                  type="text"
                  value={aesKey}
                  onChange={(e) => setAesKey(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES IV (Initialization Vector):</label>
                <input
                  type="text"
                  value={aesIv}
                  onChange={(e) => setAesIv(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">AES Mode:</label>
                <select
                  value={aesMode}
                  onChange={(e) => setAesMode(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                >
                  <option value="ECB">ECB</option>
                  <option value="CBC">CBC</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">Ciphertext:</label>
                <textarea
                  value={encryptedText}
                  onChange={(e) => setEncryptedText(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleAction}
                className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600 dark:hover:bg-green-400"
              >
                Decrypt
              </button>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Decrypted Text:</h3>
                <textarea
                  value={decryptedText}
                  readOnly
                  className="w-full h-24 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      )}

      {algorithm === 'rsa' && (
        <div>
          {action === 'encrypt' && (
            <>
              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">p (Prime 1):</label>
                <input
                  type="text"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">q (Prime 2):</label>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">e (Public Exponent):</label>
                <input
                  type="text"
                  value={e}
                  onChange={(e) => setE(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">Message (Plaintext):</label>
                <textarea
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleAction}
                className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 dark:hover:bg-blue-400"
              >
                Encrypt
              </button>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Encrypted Text (Hex):</h3>
                <textarea
                  value={encryptedText}
                  readOnly
                  className="w-full h-24 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}

          {action === 'decrypt' && (
            <>
              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">Decryption Private Key (d):</label>
                <input
                  type="text"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-900 dark:text-white">Modulus n:</label>
                <input
                  type="text"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleAction}
                className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600 dark:hover:bg-green-400"
              >
                Decrypt
              </button>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Decrypted Text (Hex):</h3>
                <textarea
                  value={decryptedText}
                  readOnly
                  className="w-full h-24 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      )}

      {algorithm === 'sha' && (
        <div>
          <div className="mb-4">
            <label className="block font-medium text-gray-900 dark:text-white">Message (Plaintext):</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleAction}
            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 dark:hover:bg-blue-400"
          >
            Hash
          </button>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Hashed Text (SHA-256):</h3>
            <textarea
              value={hashedText}
              readOnly
              className="w-full h-24 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}

      <ToastContainer /> 
    </div>
    </div>
  );
};

export default CryptoComponent;

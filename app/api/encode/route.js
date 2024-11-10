import { NextResponse } from 'next/server';

export async function POST(request) {
  const { text, tree } = await request.json();

  if (!text || !tree) {
    return NextResponse.json({ error: 'Text and Huffman tree are required' }, { status: 400 });
  }

  const { encodedText, originalSize, compressedSize } = encodeText(text, tree);

  return NextResponse.json({
    encodedText,
    originalSize,
    compressedSize,
    compressionRatio: ((1 - compressedSize / originalSize) * 100).toFixed(2)
  });
}

function encodeText(text, root) {
  const codes = {};
  
  function getCodes(node, code = '') {
    if (!node.children) {
      codes[node.char] = code;
    } else {
      getCodes(node.children[0], code + '0');
      getCodes(node.children[1], code + '1');
    }
  }
  
  getCodes(root);

  const encodedText = text.split('').map(char => codes[char]).join('');
  const originalSize = text.length * 8; // Assuming 8 bits per character
  const compressedSize = encodedText.length;

  return { encodedText, originalSize, compressedSize };
}
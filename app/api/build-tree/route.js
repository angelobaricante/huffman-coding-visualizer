import { NextResponse } from 'next/server';

export async function POST(request) {
  const { frequencyData } = await request.json();
  
  if (!frequencyData || typeof frequencyData !== 'object') {
    return NextResponse.json({ error: 'Invalid frequency data' }, { status: 400 });
  }

  const tree = buildHuffmanTree(frequencyData);
  return NextResponse.json({ tree });
}

function buildHuffmanTree(frequencyData) {
  const nodes = Object.entries(frequencyData).map(([char, frequency]) => ({
    char,
    frequency,
    code: "",
    children: null
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const parent = {
      char: left.char + right.char,
      frequency: left.frequency + right.frequency,
      code: "",
      children: [left, right]
    };
    nodes.push(parent);
  }

  function assignCodes(node, code = "") {
    if (node) {
      node.code = code;
      if (node.children) {
        assignCodes(node.children[0], code + "0");
        assignCodes(node.children[1], code + "1");
      }
    }
  }

  assignCodes(nodes[0]);
  return nodes[0];
}
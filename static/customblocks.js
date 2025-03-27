let blockIdCounter = 0;

// Helper: Create a new block element with given HTML and classes.
function createBlockElement(htmlContent, classes) {
    blockIdCounter++;
    const block = document.createElement('div');
    block.className = 'block ' + classes;
    block.id = 'block-' + blockIdCounter;
    block.innerHTML = htmlContent;
    addDragEvents(block);
    document.getElementById('workspace').appendChild(block);
}

// ----------------------
// Block Functions
// ----------------------

// 1. Print Block: print("message")
function addPrintBlock() {
    const html = `<span class="block-title">print</span> (<input type="text" value="Hello, World!" class="print-input">)`;
    createBlockElement(html, 'print-block');
}

// 2. Assignment Block: variable = value
function addAssignmentBlock() {
    const html = `<span class="block-title">Assign</span> 
        <input type="text" placeholder="variable" class="var-name">
         = 
        <input type="text" placeholder="value" class="var-value">`;
    createBlockElement(html, 'assignment-block');
}

// 3. Variable Reference Block: returns variable value
function addVariableBlock() {
    const html = `<span class="block-title">Variable:</span> 
        <input type="text" placeholder="variable" class="variable-ref">`;
    createBlockElement(html, 'variable-block');
}

// 4. If Block: if condition:
function addIfBlock() {
    const html = `<span class="block-title">if</span> (<input type="text" placeholder="condition" class="if-condition">):
    <div class="indented"><span class="nested-code">pass</span></div>`;
    createBlockElement(html, 'if-block');
}

// 5. If-Else Block:
function addIfElseBlock() {
    const html = `<span class="block-title">if</span> (<input type="text" placeholder="condition" class="if-else-condition">):
    <div class="indented"><span class="nested-code">pass</span></div>
    <span class="block-title">else:</span>
    <div class="indented"><span class="nested-code">pass</span></div>`;
    createBlockElement(html, 'ifelse-block');
}

// 6. For Loop Block: for i in range(n):
function addForBlock() {
    const html = `<span class="block-title">for i in range</span>(<input type="number" value="3" class="for-range">):
    <div class="indented"><span class="nested-code">pass</span></div>`;
    createBlockElement(html, 'for-block');
}

// 7. While Loop Block: while condition:
function addWhileBlock() {
    const html = `<span class="block-title">while</span> (<input type="text" placeholder="condition" class="while-condition">):
    <div class="indented"><span class="nested-code">pass</span></div>`;
    createBlockElement(html, 'while-block');
}

// 8. Function Definition Block: def functionName(params):
function addFunctionBlock() {
    const html = `<span class="block-title">def</span> <input type="text" placeholder="function_name" class="func-name">(<input type="text" placeholder="params" class="func-params">):
    <div class="indented"><span class="nested-code">pass</span></div>`;
    createBlockElement(html, 'function-block');
}

// 9. Return Block: return expression
function addReturnBlock() {
    const html = `<span class="block-title">return</span> <input type="text" placeholder="expression" class="return-expression">`;
    createBlockElement(html, 'return-block');
}

// 10. Function Call Block: functionName(args)
function addFunctionCallBlock() {
    const html = `<span class="block-title">Call</span> <input type="text" placeholder="function_name" class="call-func-name">(<input type="text" placeholder="args" class="call-func-args">)`;
    createBlockElement(html, 'function-call-block');
}

// 11. Comparison Block: left operator right (e.g., a == b)
function addComparisonBlock() {
    const html = `<input type="text" placeholder="left" class="comp-left"> 
        <select class="comp-operator">
            <option value="==">==</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
        </select> 
        <input type="text" placeholder="right" class="comp-right">`;
    createBlockElement(html, 'comparison-block');
}

// 12. Value Block: literal value (number or string)
function addValueBlock() {
    const html = `<span class="block-title">Value:</span> <input type="text" placeholder="value" class="literal-value">`;
    createBlockElement(html, 'value-block');
}

// 13. Input Block: input("prompt")
function addInputBlock() {
    const html = `<span class="block-title">input</span>(<input type="text" placeholder="prompt" class="input-prompt">)`;
    createBlockElement(html, 'input-block');
}

// ----------------------
// Drag and Drop Functions
// ----------------------
function addDragEvents(elem) {
    elem.addEventListener('dragstart', dragStart);
}
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}
function allowDrop(e) {
    e.preventDefault();
}
function dropBlock(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData("text/plain");
    let draggedElem = document.getElementById(id);
    // For simplicity, append the dragged element at the end of the workspace.
    document.getElementById('workspace').appendChild(draggedElem);
}

// ----------------------
// Code Generation
// ----------------------
function generatePythonCode() {
    let workspace = document.getElementById('workspace');
    let blocks = workspace.getElementsByClassName('block');
    let code = "";
    for (let block of blocks) {
        if (block.classList.contains('print-block')) {
            let input = block.querySelector('.print-input').value;
            code += 'print("' + input.replace(/"/g, '\\"') + '")\n';
        } else if (block.classList.contains('assignment-block')) {
            let varName = block.querySelector('.var-name').value;
            let varValue = block.querySelector('.var-value').value;
            code += varName + ' = ' + varValue + '\n';
        } else if (block.classList.contains('variable-block')) {
            let varRef = block.querySelector('.variable-ref').value;
            code += varRef + '\n';
        } else if (block.classList.contains('if-block')) {
            let condition = block.querySelector('.if-condition').value;
            code += 'if ' + condition + ':\n';
            let nested = block.querySelector('.nested-code').textContent;
            code += '    ' + nested + '\n';
        } else if (block.classList.contains('ifelse-block')) {
            let condition = block.querySelector('.if-else-condition').value;
            code += 'if ' + condition + ':\n';
            let nestedIf = block.getElementsByClassName('nested-code')[0].textContent;
            code += '    ' + nestedIf + '\n';
            code += 'else:\n';
            let nestedElse = block.getElementsByClassName('nested-code')[1].textContent;
            code += '    ' + nestedElse + '\n';
        } else if (block.classList.contains('for-block')) {
            let count = block.querySelector('.for-range').value;
            code += 'for i in range(' + count + '):\n';
            let nested = block.querySelector('.nested-code').textContent;
            code += '    ' + nested + '\n';
        } else if (block.classList.contains('while-block')) {
            let condition = block.querySelector('.while-condition').value;
            code += 'while ' + condition + ':\n';
            let nested = block.querySelector('.nested-code').textContent;
            code += '    ' + nested + '\n';
        } else if (block.classList.contains('function-block')) {
            let funcName = block.querySelector('.func-name').value;
            let params = block.querySelector('.func-params').value;
            code += 'def ' + funcName + '(' + params + '):\n';
            let nested = block.querySelector('.nested-code').textContent;
            code += '    ' + nested + '\n';
        } else if (block.classList.contains('return-block')) {
            let expr = block.querySelector('.return-expression').value;
            code += 'return ' + expr + '\n';
        } else if (block.classList.contains('function-call-block')) {
            let funcName = block.querySelector('.call-func-name').value;
            let args = block.querySelector('.call-func-args').value;
            code += funcName + '(' + args + ')\n';
        } else if (block.classList.contains('comparison-block')) {
            let left = block.querySelector('.comp-left').value;
            let op = block.querySelector('.comp-operator').value;
            let right = block.querySelector('.comp-right').value;
            code += left + ' ' + op + ' ' + right + '\n';
        } else if (block.classList.contains('value-block')) {
            let val = block.querySelector('.literal-value').value;
            if (isNaN(val)) {
                code += '"' + val.replace(/"/g, '\\"') + '"\n';
            } else {
                code += val + '\n';
            }
        } else if (block.classList.contains('input-block')) {
            let prompt = block.querySelector('.input-prompt').value;
            code += 'input("' + prompt.replace(/"/g, '\\"') + '")\n';
        }
    }
    return code;
}

// ----------------------
// Run Code
// ----------------------
function runCode() {
    let code = generatePythonCode();
    console.log("Generated Code:\n", code);
    fetch('/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.output;
    })
    .catch(err => {
        document.getElementById('output').textContent = 'Error: ' + err;
    });
}

// ----------------------
// Toolbox Toggle
// ----------------------
function toggleToolbox() {
    let toolbox = document.getElementById('toolbox');
    toolbox.classList.toggle('hidden');
}

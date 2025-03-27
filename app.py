from flask import Flask, render_template, request, jsonify
import io, sys, traceback

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get('code', '')
    
    # Capture standard output.
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()
    try:
        # WARNING: exec() is inherently dangerous.
        # In production, use a secure sandbox.
        exec(code, {})
        output = sys.stdout.getvalue()
    except Exception:
        output = traceback.format_exc()
    finally:
        sys.stdout = old_stdout
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)

from flask import Flask, render_template, request, jsonify
import io
import sys
import traceback

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get('code', '')
    
    # Redirect stdout to capture print statements.
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()
    try:
        # WARNING: Using exec() is inherently dangerous.
        # In production, use a sandboxed environment.
        exec(code, {})  # Execute the code in a new, empty namespace.
        output = sys.stdout.getvalue()
    except Exception:
        output = traceback.format_exc()
    finally:
        sys.stdout = old_stdout
    return jsonify({'output': output})

# Optional: A route for a pygame demo.
@app.route('/execute_pygame', methods=['POST'])
def execute_pygame():
    # This is a placeholder. A production version could:
    #   - Run pygame code that draws on a surface.
    #   - Capture the surface as an image.
    #   - Return the image (e.g., base64 encoded) to the client.
    # For now, we simply return a message.
    return jsonify({'output': 'Pygame demonstration coming soon!'})

if __name__ == '__main__':
    app.run(debug=True)

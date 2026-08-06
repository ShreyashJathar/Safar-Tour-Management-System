import os
import sys
import webbrowser
from threading import Timer
from database import init_db
from app import app

def open_browser():
    try:
        webbrowser.open_new('http://127.0.0.1:5000/')
    except Exception as e:
        pass

if __name__ == '__main__':
    print("Initializing Database...")
    init_db()
    
    port = int(os.environ.get("PORT", 5000))
    print(f"\n========================================================")
    print(f"   D O C T O R   V O I C E   S Y S T E M   S E R V E R")
    print(f"========================================================")
    print(f" Server running at: http://localhost:{port}/")
    print(f" Press CTRL+C to stop the server.")
    print(f"========================================================\n")
    
    # Auto-open browser in 1.5 seconds if running locally
    if not os.environ.get("WERKZEUG_RUN_MAIN"):
        Timer(1.5, open_browser).start()
        
    app.run(host='0.0.0.0', port=port, debug=True)

from flask import Flask, render_template

app = Flask(__name__, template_folder="./back/dist/", static_folder="./back/dist/", static_url_path='')

@app.route("/")
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)

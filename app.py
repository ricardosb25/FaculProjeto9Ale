from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

bomba_ligada = False

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dados")
def dados():
    global bomba_ligada
    
    umidade_atual = int(request.args.get('umidade', 40))

    if umidade_atual < 30:
        bomba_ligada = True
    elif umidade_atual > 70:
        bomba_ligada = False

    return jsonify({
        "umidade": umidade_atual,
        "bomba": bomba_ligada
    })

if __name__ == "__main__":
    app.run(debug=True)
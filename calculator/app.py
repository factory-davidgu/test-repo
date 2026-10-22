"""A simple calculator web app built with Flask."""

from flask import Flask, render_template, request

app = Flask(__name__)

OPERATIONS = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b,
}


@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    error = None

    if request.method == "POST":
        num1 = request.form.get("num1", "")
        num2 = request.form.get("num2", "")
        operation = request.form.get("operation", "+")

        try:
            a = float(num1)
            b = float(num2)
            if operation not in OPERATIONS:
                raise ValueError("Unsupported operation")
            if operation == "/" and b == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = OPERATIONS[operation](a, b)
        except ValueError:
            error = "Please enter valid numbers."
        except ZeroDivisionError:
            error = "Cannot divide by zero."

    return render_template("index.html", result=result, error=error)


if __name__ == "__main__":
    app.run(debug=True)

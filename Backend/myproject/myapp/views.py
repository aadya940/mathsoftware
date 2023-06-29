from django.http import JsonResponse
from sympy import Symbol, sympify, symbols, solve
from sympy.parsing.sympy_parser import parse_expr
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from sympy.plotting import plot


def polynomial_plot(request, expression):
    # # Get the expression from the request parameters
    expression = str(expression)

    # Convert the string expression to a SymPy expression
    x = symbols("x")

    expression = parse_expr(expression)
    expr = sympify(expression)

    # x_vals_ = range(-1000, 1000)
    # y_vals_ = [expr.subs(x, i) for i in x_vals_]

    p = plot(expr, (x, -100, 100), show=False)

    # # Create the plot
    # plt.plot(x_vals_, y_vals_)
    # plt.xlabel(x)
    # plt.ylabel(expression)
    # plt.grid(True)

    # Convert the plot to an image
    buffer = BytesIO()
    # plt.savefig(buffer, format="png")
    p.save(buffer)
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    # Close the plot to release memory
    plt.close()

    # Return the image URL to the frontend
    return JsonResponse({"image": image_base64})

from django.urls import path
from . import views

urlpatterns = [
    path("plot<str:expression>", view=views.polynomial_plot, name="plot_poly"),
]

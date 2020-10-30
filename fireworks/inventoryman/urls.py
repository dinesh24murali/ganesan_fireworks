from django.urls import path
from inventoryman import views

urlpatterns = [
    path('filter_products/', views.CrackerSearch.as_view()),
    path('product/', views.CrackerView.as_view()),
    path('product/<int:pk>', views.CrackerDetail.as_view()),
]

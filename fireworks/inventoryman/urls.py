from django.urls import path
from inventoryman import views

urlpatterns = [
    path('filter_products/', views.CrackerSearch.as_view()),
    path('product/', views.CrackerView.as_view()),
    path('product/<int:pk>', views.CrackerDetail.as_view()),
    path('filter_customers/', views.CustomerSearch.as_view()),
    path('customer/', views.CustomerView.as_view()),
    path('customer/<int:pk>', views.CustomerDetail.as_view()),
    path('add_sales/', views.AddSalesView.as_view()),
    path('get_sales/', views.GetSalesView.as_view()),
    path('sales/<int:pk>', views.SalesView.as_view()),
]

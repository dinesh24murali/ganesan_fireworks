from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from inventoryman.models import Cracker, Customer, Sales
from inventoryman.serializers import CrackerSerializer, CustomerSerializer, SalesSerializer, SalesDataSerializer

from inventoryman.sales_views import add_sales, update_sales


class CrackerSearch(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Cracker.objects.all()
    serializer_class = CrackerSerializer


class CrackerView(APIView):

    def get(self, request):
        products = Cracker.objects.all()
        serializer = CrackerSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CrackerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CrackerDetail(APIView):

    def get_object(self, pk):
        try:
            return Cracker.objects.get(id=pk)
        except Cracker.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        snippet = self.get_object(pk)
        serializer = CrackerSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk):
        cracker = self.get_object(pk)
        serializer = CrackerSerializer(cracker, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cracker = self.get_object(pk)
        cracker.delete()
        return Response(status=status.HTTP_200_OK)


class CustomerSearch(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerView(APIView):

    def get(self, request):
        customer = Customer.objects.all()
        serializer = CustomerSerializer(customer, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetail(APIView):

    def get_object(self, pk):
        try:
            return Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def put(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = self.get_object(pk)
        customer.delete()
        return Response(status=status.HTTP_200_OK)


class AddSalesView(APIView):

    def post(self, request):

        try:
            add_sales(request.data)
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response("error", status=status.HTTP_400_BAD_REQUEST)


class SalesView(APIView):

    def get_object(self, pk):
        try:
            return Sales.objects.get(id=pk)
        except Sales.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        sales = self.get_object(pk)
        serializer = SalesSerializer(sales)
        sales_data = sales.salesdata_set.all()
        items = SalesDataSerializer(sales_data, many=True)
        payload = {
            "sales": serializer.data,
            "sales_data": items.data,
        }
        return Response(payload)

    def put(self, request, pk):
        try:
            update_sales(request.data, pk)
            return Response({"success": True}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response("error", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        sales = self.get_object(pk)
        sales.delete()
        return Response(status=status.HTTP_200_OK)


class GetSalesView(APIView):

    def get(self, request):
        customer_id = request.GET.get('customer', '')
        if customer_id:
            customer = Customer.objects.get(pk=customer_id)
            queryset = Sales.objects.filter(customer=customer)
        else:
            queryset = Sales.objects.all().order_by('-date')
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = SalesSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


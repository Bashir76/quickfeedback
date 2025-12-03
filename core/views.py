from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from .models import Category, Item, Feedback
from .serializers import CategorySerializer, ItemSerializer, FeedbackSerializer


# --------------------------
# CATEGORY LIST + CREATE
# --------------------------
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []


# --------------------------
# ITEM LIST + CREATE
# --------------------------
class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []


# --------------------------
# ITEM DETAIL VIEW
# --------------------------
class ItemDetailView(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


# --------------------------
# LIST FEEDBACK FOR AN ITEM
# --------------------------
class FeedbackListCreateView(generics.ListCreateAPIView):
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        item_id = self.kwargs["item_id"]
        return Feedback.objects.filter(item_id=item_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --------------------------
# CREATE FEEDBACK (POST only)
# --------------------------
class FeedbackCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, item_id):
        # Check item exists
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)

        # Create feedback
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, item=item)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

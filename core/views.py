from rest_framework import generics
from .models import Category, Item, Feedback
from .serializers import CategorySerializer, ItemSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []
        

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []


class ItemDetailView(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class FeedbackListCreateView(generics.ListCreateAPIView):
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        item_id = self.kwargs["item_id"]
        return Feedback.objects.filter(item_id=item_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

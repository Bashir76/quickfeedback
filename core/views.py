from rest_framework import generics
from .models import Category, Item, Feedback
from .serializers import CategorySerializer, ItemSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


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

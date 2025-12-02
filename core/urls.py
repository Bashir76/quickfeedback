from django.urls import path
from .views import (
    CategoryListCreateView, ItemListCreateView,
    ItemDetailView, FeedbackListCreateView
)

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view()),
    path('items/', ItemListCreateView.as_view()),
    path('items/<int:pk>/', ItemDetailView.as_view()),
    path('items/<int:item_id>/feedback/', FeedbackListCreateView.as_view()),
]

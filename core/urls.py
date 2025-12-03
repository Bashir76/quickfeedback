from django.urls import path
from .views import (
    CategoryListCreateView,
    ItemListCreateView,
    ItemDetailView,
    FeedbackCreateView,
)
from .analytics_views import (
    TopRatedItemsView,
    TrendingItemsView,
    ItemRatingStatsView,
)

urlpatterns = [
    path("categories/", CategoryListCreateView.as_view(), name="categories"),
    path("items/", ItemListCreateView.as_view(), name="items"),
    path("items/<int:pk>/", ItemDetailView.as_view(), name="item-detail"),
    path("items/<int:item_id>/feedback/", FeedbackCreateView.as_view(), name="item-feedback"),

    # Analytics
    path("analytics/top-rated/", TopRatedItemsView.as_view(), name="top-rated"),
    path("analytics/trending/", TrendingItemsView.as_view(), name="trending"),
    path("analytics/item/<int:item_id>/stats/", ItemRatingStatsView.as_view(), name="item-stats"),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('auth/', include('core.auth_urls')),
    path('analytics/top-rated/', TopRatedItemsView.as_view()),
    path('analytics/item/<int:item_id>/stats/', ItemRatingStatsView.as_view()),
    path('analytics/trending/', TrendingItemsView.as_view()),
]

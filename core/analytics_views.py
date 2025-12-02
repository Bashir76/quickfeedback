from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count
from .models import Item, Feedback


class TopRatedItemsView(APIView):
    def get(self, request):
        items = (
            Item.objects.annotate(avg_rating=Avg("feedbacks__rating"))
            .order_by("-avg_rating")[:5]
        )

        data = [
            {
                "item": item.title,
                "average_rating": item.avg_rating
            }
            for item in items
        ]
        return Response(data)


class ItemRatingStatsView(APIView):
    def get(self, request, item_id):
        stats = (
            Feedback.objects.filter(item_id=item_id)
            .values("rating")
            .annotate(count=Count("rating"))
        )

        return Response(list(stats))

from django.core.cache import cache

class TrendingItemsView(APIView):
    def get(self, request):
        cached = cache.get("trending_items")

        if cached:
            return Response(cached)

        items = (
            Item.objects.annotate(count=Count("feedbacks"))
            .order_by("-count")[:5]
        )

        data = [
            {"item": item.title, "feedback_count": item.count}
            for item in items
        ]

        # Cache for 1 hour
        cache.set("trending_items", data, timeout=3600)

        return Response(data)

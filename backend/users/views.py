from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializers
from django.core import signing


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        serializer = UserSerializers(user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        serializer = UserSerializers(user, request.data, partial=True)
        if serializer.is_valid():
            return Response({"user": serializer.data}, status=status.HTTP_200_OK)

        return Response(
            {"errors": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request):
        user = request.user
        username = user.username
        user.delete()
        return Response(
            {"message": f"'{username}' deleted successfully."},
            status=status.HTTP_200_OK,
        )


class UserDetailView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": f"User with '{user_id}' id doesn't exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = UserSerializers(user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)


class UserCodeView(APIView):
    def post(self, request, user_id):
        code = (request.data.get("code") or "").strip()
        try:
            user_data = signing.loads(code)
        except signing.BadSignature:
            return Response(
                {"message": "Bad signing."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(user_data)

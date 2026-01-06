from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializers


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

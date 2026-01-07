from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.serializers import UserSerializer
from attendance.serializers import AttendanceSessionSerializer, AttendanceSerializer
from attendance.models import Attendance, AttendanceSession


class GetUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.filter(is_staff=False)
        return Response(
            {"users": UserSerializer(users, many=True).data}, status=status.HTTP_200_OK
        )


class AttendanceSessionView(APIView):
    def get(self, request):
        sessions = AttendanceSession.objects.all()
        serialized_sessions = AttendanceSessionSerializer(sessions, many=True)

        return Response(
            {"sessions": serialized_sessions.data}, status=status.HTTP_200_OK
        )

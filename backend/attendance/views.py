from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Attendance, AttendanceSession
from .serializers import AttendanceSerializer, AttendanceSessionSerializer


class AttendanceSessionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = AttendanceSessionSerializer(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"attendance_session": serializer.data}, status=status.HTTP_200_OK
            )

        return Response(
            {"errors": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request, session_id):
        try:
            session = AttendanceSession.objects.get(id=session_id)
            return Response({"session": session.data}, status=status.HTTP_200_OK)
        except AttendanceSession.DoesNotExist:
            return Response(
                {"errors": [{"session": "Session doesn't exist."}]},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, session_id):
        try:
            session = AttendanceSession.objects.get(id=session_id)
            session.delete()
            return Response(
                {"message": "Session deleted successfully."}, status=status.HTTP_200_OK
            )
        except AttendanceSession.DoesNotExist:
            return Response(
                {"errors": [{"session": "Session doesn't exist."}]},
                status=status.HTTP_404_NOT_FOUND,
            )


class AttendanceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request):
        attendance_status = (request.data.get("status") or "").strip()
        user_id = (request.data.get("status") or "").strip()
        session_id = (request.data.get("status") or "").strip()

        errors = {}
        if attendance_status.lower() not in [
            "present",
            "late",
            "absent",
            "special_case",
        ]:
            errors["status"] = "Invalid status"
        if not user_id:
            errors["user_id"] = "User id is required"
        if not session_id:
            errors["session_id"] = "Session id is required"

        if attendance_status == "special_case":
            reason = (request.data.get("reason") or "").strip()
            if not reason:
                errors["special_case"] = "Special Case is required"

        if errors:
            return Response({"errors": errors}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(id=user_id)
            session = AttendanceSession.objects.get(id=session_id)
            attendance_exists = Attendance.objects.filter(
                user=user, session=session
            ).exists()

            if attendance_exists:
                return Response(
                    {"error": "Attendance recored already set for this user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            attendance = Attendance.objects.create(
                user=user, session=session, status=attendance_status
            )
            if reason:
                attendance.reason = reason
                attendance.save()

            return Response(
                {"message": "Attendance set successfully."}, status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"error": f"User with '{user_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except AttendanceSession.DoesNotExist:
            return Response(
                {"error": f"Session with '{session_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )

    def patch(self, request):
        attendance_status = (request.data.get("status") or "").strip()
        user_id = (request.data.get("status") or "").strip()
        session_id = (request.data.get("status") or "").strip()

        errors = {}
        if attendance_status.lower() not in [
            "present",
            "late",
            "absent",
            "special_case",
        ]:
            errors["status"] = "Invalid status"
        if not user_id:
            errors["user_id"] = "User id is required"
        if not session_id:
            errors["session_id"] = "Session id is required"

        if attendance_status == "special_case":
            reason = (request.data.get("reason") or "").strip()
            if not reason:
                errors["special_case"] = "Special Case is required"

        if errors:
            return Response({"errors": errors}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(id=user_id)
            session = AttendanceSession.objects.get(id=session_id)
            attendance_exists = Attendance.objects.filter(
                user=user, session=session
            ).exists()

            if not attendance_exists:
                return Response(
                    {"error": "Attendance recored doesn't exist for this user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            attendance = Attendance.objects.get(user=user, session=session)
            attendance.status = attendance_status
            if reason:
                attendance.reason = reason
            attendance.save()

            return Response(
                {"message": "Attendance updated successfully."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"error": f"User with '{user_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except AttendanceSession.DoesNotExist:
            return Response(
                {"error": f"Session with '{session_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request):
        user_id = (request.data.get("status") or "").strip()
        session_id = (request.data.get("status") or "").strip()

        errors = {}

        if not user_id:
            errors["user_id"] = "User id is required"
        if not session_id:
            errors["session_id"] = "Session id is required"

        if errors:
            return Response({"errors": errors}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(id=user_id)
            session = AttendanceSession.objects.get(id=session_id)
            attendance_exists = Attendance.objects.filter(
                user=user, session=session
            ).exists()

            if not attendance_exists:
                return Response(
                    {"error": "Attendance recored doesn't exist for this user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            attendance = Attendance.objects.get(user=user, session=session)

            attendance.delete()

            return Response(
                {"message": "Attendance deleted successfully."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"error": f"User with '{user_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except AttendanceSession.DoesNotExist:
            return Response(
                {"error": f"Session with '{session_id}' doesn't exists."},
                status=status.HTTP_404_NOT_FOUND,
            )

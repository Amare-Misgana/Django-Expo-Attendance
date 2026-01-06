from .models import Attendance, AttendanceSession
from rest_framework import serializers


class AttendanceSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceSession
        fields = "__all__"


class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = "__all__"

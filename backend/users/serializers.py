from rest_framework import serializers
from django.contrib.auth.models import User
from django.core import signing


class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    code = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "last_login",
            "date_joined",
            "code",
        ]

    def get_code(self, obj):
        user_data = {
            "id": obj.id,
            "username": obj.username,
        }
        if obj.id and obj.username:

            return signing.dumps(user_data)
        return None

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

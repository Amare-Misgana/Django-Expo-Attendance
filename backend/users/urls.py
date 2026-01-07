from django.urls import path
from .views import (
    UserView,
    UserDetailView,
    LoginView,
    SendVerificationCodeView,
    VerifyCodeView,
    EditProfileView,
    GetUserView,
)

urlpatterns = [
    path("", UserView.as_view()),
    path("get/", GetUserView.as_view()),
    path("profile/edit/", EditProfileView.as_view()),
    path("get/<int:user_id>/", UserDetailView.as_view()),
    path("login/", LoginView.as_view()),
    path("verify/", VerifyCodeView.as_view()),
    path("send-code/", SendVerificationCodeView.as_view()),
]

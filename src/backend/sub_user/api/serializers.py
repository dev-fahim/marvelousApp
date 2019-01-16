from rest_framework import serializers
from sub_user.models import SubUserModel
import uuid
from django.contrib.auth import get_user_model
User = get_user_model()


class SubUserModelSerializers(serializers.ModelSerializer):

    class Meta:
        model = SubUserModel
        fields = ('user_type', 'canAdd', 'canRetrieve', 'canEdit', 'canEdit', 'canList')


class RootUserModelSerializer(serializers.ModelSerializer):
    root_sub_user = SubUserModelSerializers(many=False, read_only=False)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'root_sub_user')
    
    def request_data(self):
        return self.context['request']
    
    def logged_in_user(self):
        return self.request_data().user
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(detail='Passwords mut match')
        return attrs
    
    @staticmethod
    def validate_email(value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(detail='That email address is already taken.')
        return value
    
    def create(self, validated_data):
        root_sub_user_validated_data = validated_data.get('root_sub_user')

        username = validated_data.get('username')
        password = validated_data.get('password')
        email = validated_data.get('email')

        obj = User.objects.create_user(username=username, password=password, email=email)
        SubUserModel.objects.create(
            root_user=obj,
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **root_sub_user_validated_data
            )

        return obj
    
    # def update(self, instance, validated_data): 

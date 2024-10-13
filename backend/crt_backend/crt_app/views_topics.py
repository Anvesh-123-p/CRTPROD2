from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import smtplib

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import UserSerializer, SubjectSerializer
import smtplib
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q


class TopicDetailView(APIView):

    def get(self, request):
        param = request.GET
        if param.get('lspid'):
            queryset = Topic.objects.filter(LessonPlan_id=param.get('lspid'))  
            serializer = TopicSerializer(queryset,many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)
        # queryset = Topic.objects.all()  # Query all Topic instances
        # serializer = TopicSerializer(queryset, many=True)  # Serialize the queryset
        # return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data with a 200 OK status
    
    
    def post(self, request):
        data = request.data
        print(data)

        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = Topic.objects.filter(LessonPlan_id=request.data['LessonPlan_id'])  
            serializer = TopicSerializer(queryset,many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)
        
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        tid = request.data.get('id')
        
        if not id:
            return Response(
                {"status": "error", "message": "Topic id is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            to = Topic.objects.get(id=tid)
        except to.DoesNotExist:
            return Response(
                {"status": "error", "message": "Topic not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TopicSerializer(to, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            queryset = Topic.objects.filter(LessonPlan_id=request.data['LessonPlan_id'])  
            serializertop = TopicSerializer(queryset,many=True)
            q=1
            pencount=0
            cocount=0
            for i in serializertop.data:
                if(i['status']=='Not Started'):
                    q=0
                    pencount=pencount+i['hours']
                else:
                    cocount=cocount+i['hours']
            if(q==1):
                d={
                    'status':'Completed',
                    'completedhours':cocount,
                    'pendinghours':pencount
                }
                lsp = LessonPlan.objects.get(id = request.data['LessonPlan_id'])
                lspser = LessonPlanSerializer(lsp, data=d, partial=True)
                if lspser.is_valid():
                    lspser.save()
                    return Response({"status": "success", "data": 'Subject Fully Completed'}, status=200)


            else:
                d={
                    'status':'In Progress',
                    'completedhours':cocount,
                    'pendinghours':pencount
                    
                }
                lsp = LessonPlan.objects.get(id = request.data['LessonPlan_id'])
                lspser = LessonPlanSerializer(lsp, data=d, partial=True)
                if lspser.is_valid():
                    lspser.save()
                    return Response({"status": "success", "data": 'Subject Fully Completed'}, status=200)





            return Response({"status": "success", "data": TopicSerializer(to).data}, status=200)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=400)

        
    
    def delete(self, request):
        param = request.GET
        topic_id = param.get('id')  # Fetch the id from query parameters

        if not topic_id:
            return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            topic = get_object_or_404(Topic, id=topic_id)  # Fetch the Topic instance by ID or return 404 if not found
            lspidd=topic.LessonPlan_id
            topic.delete()  # Delete the topic instance

            queryset = Topic.objects.filter(LessonPlan_id=lspidd)  
            serializer = TopicSerializer(queryset,many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)
            # return Response({"status": "success", "data": "Topic deleted successfully"}, status=200)

        except ValueError:
            return Response({"error": "Invalid ID provided"}, status=status.HTTP_400_BAD_REQUEST)
        

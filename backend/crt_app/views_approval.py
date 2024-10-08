from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import smtplib
import ast

def sendmail(stu_name,approval_type,old_data,new_data,receiver):
    server =smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("crtproject258@gmail.com","lxiz muyd zast abwg")
    message=stu_name + " has sent a apprval request with type "+approval_type+" changing from "+old_data+" to "+new_data
    
    server.sendmail("crtproject258@gmail.com",receiver,message)
    print("hi")

def sendmail_response(stu_name,approval_type,old_data,new_data,receiver,st):
    server =smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("crtproject258@gmail.com","lxiz muyd zast abwg")
    if(st=='approved'):
        message="Hey, Your New Account request realted to  user name "+stu_name + " has been "+st+ "by dept, Please proceed to login and access the and application, Thanks"
    else:
        message="Hey, Your New Account request realted to  user name "+stu_name + " has been "+st+ "by dept, Please proceed to Sign up and create new account again if its an mistake, Thanks"

        
    print(message)
    server.sendmail("crtproject258@gmail.com",receiver,message)
    print("hey")


class ApprovalView(APIView):
    def get(self, request, *args, **kwargs):
        param=request.GET

        if param.get('dept'):
            department = param.get('dept')
            queryset = Approval.objects.filter(
                dept=department,
                status="pending"

            )

            serializer = ApprovalSerializer(queryset, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)
        
        
      

        try:

            approval = Approval.objects.get(approval_id=param.get('approval_id'))
        except Approval.DoesNotExist:
            return Response({"error": "Approval not found"}, status=404)

        # Prepare the result dictionary
        result = {
            'approval_id': approval.approval_id,
            'user_name': approval.user_name,
            'roll_number': approval.roll_number,
            'user_email': approval.user_email,
            'hod_id': approval.hod_id.id,
            'dept': approval.dept,
            'status': approval.status,
            'approval_type': approval.approval_type,
            'old_data': approval.old_data,
            'new_data': ast.literal_eval(approval.new_data),
            'new_data_keys':ast.literal_eval(approval.new_data).keys(),
            'new_data_vals':ast.literal_eval(approval.new_data).values()

        }
       
        if(result['approval_type']!='new_lessonplan_approval'):
            if(result['new_data']['user_type']=='ST'):
                clid= result['new_data']['clg_name']
                clsd= result['new_data']['class_id']
                college = College.objects.get(id=clid)
                clas = Class.objects.get(class_id=clsd)
                collegeserializer = CollegeSerializer(college)
                clseriali = ClassSerializer(clas)

                college_actual_name=collegeserializer.data['name']
                class_actual_name=str(clseriali.data['sem'])+"--"+str(clseriali.data['dept'])+"--"+str(clseriali.data['sec'])
                print(class_actual_name)
                result['new_data']['clg_name']=college_actual_name
                result['new_data']['class_id']=class_actual_name
                result['new_data']['user_type']='Student'
            else:
                clid= result['new_data']['clg_name']
                clsd= result['new_data']['class_id']
                college = College.objects.get(id=clid)
                clas = Class.objects.get(class_id=clsd)
                collegeserializer = CollegeSerializer(college)
                clseriali = ClassSerializer(clas)

                college_actual_name=collegeserializer.data['name']
                class_actual_name=str(clseriali.data['sem'])+"--"+str(clseriali.data['dept'])+"--"+str(clseriali.data['sec'])
                print(class_actual_name)
                result['new_data']['clg_name']=college_actual_name
                result['new_data']['class_id']=class_actual_name
                result['new_data']['user_type']='Faculty'
        else:
          
            subj = Subject.objects.get(sub_id=result['new_data']['sub_id'])
            u = User.objects.get(id=result['new_data']['faculty_id'])
            sseri = SubjectSerializer(subj)
            sseri2 = UserSerializer(u)
            clsd= result['new_data']['class_id']
            clas = Class.objects.get(class_id=clsd)
            clseriali = ClassSerializer(clas)
            class_actual_name=str(clseriali.data['sem'])+"--"+str(clseriali.data['dept'])+"--"+str(clseriali.data['sec'])

            result['new_data']['class_id']=class_actual_name
            result['new_data']['sub_id']=sseri.data['name']
            result['new_data']['faculty_id']=sseri2.data['name']
            queryset = Topic.objects.filter(
                
                LessonPlan_id="2"

            )

            serializertop = TopicSerializer(queryset, many=True)
            if serializertop.is_valid:
                print(serializertop.data)
            rt=[]
            for i in serializertop.data:
                print(i['id'])
                print("-------------")
                rt.append(i)

            result['topics']=rt

        return Response(result)



    def patch(self, request):
        action = request.data.get('status')
        approval_id = request.data.get('approval_id')
        
        print(action,approval_id)
        if not action or not approval_id:
            return Response({'error': 'Action and approval_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            approval = Approval.objects.get(approval_id=approval_id)
            # Retrieve details from the approval record
            user_email = approval.user_email
            approval_type = approval.approval_type
            old_data = approval.old_data
            new_data = approval.new_data
            user_name=approval.user_name
            # Retrieve the associated user
            user = User.objects.get(email=user_email)
            
            if action == 'approved':
               
                print("12345")
                user.status = 'AC'
                user.save(update_fields=['status'])
                # elif approval_type == 'percentage':
                #     user.percentage = int(new_data) 
                #     user.save(update_fields=['percentage'])
                              
                # elif approval_type == 'new_lessonplan_approval':
                #     lsp=LessonPlan.objects.get()
                #     LessonPlan.status = 'AC'
                #     user.save(update_fields=['college_name'])
                approval.status = 'approved'
                approval.save()
                print(user_name,approval_type,old_data,new_data)
                sendmail_response(user_name,approval_type,old_data,new_data,user_email,action)
                return Response({'message': 'Approval accepted and user updated successfully.'}, status=status.HTTP_200_OK)        
            elif action == 'rejected':
                approval.status = 'Rejected'
                user.delete()
                approval.save()
                sendmail_response(user_name,approval_type,old_data,new_data,user_email,action)
                return Response({'message': 'Approval rejected successfully.'}, status=status.HTTP_200_OK)
        
            else:
                return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)
        except Approval.DoesNotExist:
            return Response({'error': 'Approval record not found.'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    
    
    def delete(self, request, *args, **kwargs):
        approval_id = request.query_params.get('approval_id')
        
        if not approval_id:
            return Response({"error": "Approval ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            approval = Approval.objects.get(approval_id=approval_id)
            approval.delete()
            return Response({"message": "Approval deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Approval.DoesNotExist:
            return Response({"error": "Approval not found"}, status=status.HTTP_404_NOT_FOUND)    

from django.core.exceptions import ValidationError
import random
import string



def generate_reset_code():
        code = ''.join(random.choices(string.digits, k=6))
        return code

def send_reset_email(email, reset_code):
        # Send an email with the reset code using smtplib
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login("crtproject258@gmail.com", "lxiz muyd zast abwg")
        subject = "Password Reset Code"
        message = f"Subject: {subject}\n\nYour password reset code is {reset_code}. Please enter this code to reset your password."
        server.sendmail("crtproject258@gmail.com", "hruthika.sa258@gmail.com", message)
        server.quit()

def request_password_reset( email):
        # Generate and send reset code
        
        try:
                
            user = User.objects.get(email=email)
            print(user)
        except User.DoesNotExist:
            raise ValidationError("No user with this email address exists.")
        sent=False
        reset_code = generate_reset_code()
        user.reset_password = reset_code
        try:
            send_reset_email(email, reset_code)
            user.save()

        except:
            pass
        else:
            sent=True
        if sent:
            return "Reset code sent to email."
        else:
            raise ValidationError(" email is not sent Please try again.")

def validate_reset_code( email, entered_code):
        print("enetred code")
        # Validate the entered reset code
        valid=False
        # print(user,user.reset_password)
        try:
            user = User.objects.get(email=email)
            print(user,user.reset_password)
            if user.reset_password == entered_code:
            
                valid=True
        except User.DoesNotExist:
            pass
        return valid

def reset_password( email, new_password):
        # Reset password if the code is valid
        if email:
            user = User.objects.get(email=email)
            user.password=new_password 
            user.reset_password=""
            user.save()
            
            return "Password successfully reset."
        else:
            raise ValidationError("Invalid reset code or code expired.")

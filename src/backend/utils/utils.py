import csv
from django.core.mail import EmailMessage


def sum_int_of_array(array):
    sum_of_array = 0

    for value in array:
        sum_of_array = sum_of_array + value
    return sum_of_array


def django_generate_csv_from_model_object(file_obj, query_set, headings, attributes):

    writer = csv.writer(file_obj, delimiter=',')
    writer.writerow(headings)

    for obj in query_set:
        writer.writerow([obj.__getattribute__(name) for name in attributes])
    return writer


def django_send_email(subject, body, from_email, to, fail_silently=False):
    email = EmailMessage(subject=subject, body=body, from_email=from_email, to=to)
    return email.send(fail_silently=fail_silently)


def django_send_email_with_attachments(subject, body, from_email, to, file_name, content, mimetype, fail_silently=False):
    email = EmailMessage(subject=subject, body=body, from_email=from_email, to=to)
    email.attach(filename=file_name, content=content, mimetype=mimetype)
    email.send(fail_silently=fail_silently)
    return email

def django_generate_pdf():
    pass

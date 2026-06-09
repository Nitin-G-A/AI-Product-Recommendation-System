def age_to_group(age):

    if age <= 12:
        return "Child"

    elif age <= 19:
        return "Teen"

    elif age <= 35:
        return "Young Adult"

    elif age <= 55:
        return "Adult"

    else:
        return "Senior"


print(age_to_group(5))
print(age_to_group(17))
print(age_to_group(27))
print(age_to_group(45))
print(age_to_group(65))